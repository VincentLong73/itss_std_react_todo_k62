import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';
import useFirebaseStorage from '../hooks/firebaseStorage';

/* ライブラリ */
import {getKey} from "../lib/util";



function Todo() {
  // const [items, putItems] = React.useState([
  //     /* テストコード 開始 */
  //   { key: getKey(), text: '日本語の宿題', done: false },
  //   { key: getKey(), text: 'reactを勉強する', done: false },
  //   { key: getKey(), text: '明日の準備をする', done: false },
  //   /* テストコード 終了 */
  // ]);
  
  const [items, addItem, updateItem, clearItems] = useFirebaseStorage();

  
  //const [items, putItems, clearItems] = useStorage();
  
  const handleClickChecBox = checked => {
    // const newItems = items.map(item =>{
    //   if(item.key == checked.key){
    //     item.done = !item.done;
    //   }
    //   return item;
    // });
    // putItems(newItems);
    
    updateItem(checked);
};

const handleAdd = text =>{
  ///putItems([...items, {key: getKey(), text, done: false}]);
  addItem({ text, done: false });
};

const [filter, setFilter] = React.useState('ALL');

const listItem = items.filter(item =>{
  if(filter === 'ALL')
    return true;
  if(filter === 'TODO')
    return !item.done;
  if(filter === 'DONE')
    return item.done;
});

const handleFilterChange = value => setFilter(value);

  return (
    <div className="panel is-danger">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onAdd={handleAdd}/>
      <Filter 
        onChange = {handleFilterChange}
        value = {filter}
      />
      {listItem.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onClick={handleClickChecBox}
        />
      ))}
      <div className="panel-block">
        {listItem.length} items
      </div>
      <div
        className = "panel-book">
          <button variant="primary" size="lg" active
            className = "button"
            onClick = {clearItems}
          >
          全てのTODOを削除
          </button>
      </div>
    </div>
  );
}

export default Todo;