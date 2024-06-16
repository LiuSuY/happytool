import PickList from '@com/pickList'
import { useState } from 'react';

export type pickListItem = {
  handleName: string,
  pagePath: string
}

export default function Home() {
  const pickListInfo: Array<pickListItem> = [{
    handleName: 'edit or watch todo list',
    pagePath: '/todo'
  }, {
    handleName: 'audio or video play',
    pagePath: '/play'
  }, {
    handleName: '3d modal show',
    pagePath: '/welcome'
  }
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <PickList title="What are you going to do today?" list={pickListInfo}></PickList>
    </main>
  );
}
