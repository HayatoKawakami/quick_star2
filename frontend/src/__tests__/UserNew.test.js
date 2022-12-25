import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { UserNew } from '../components/pages/users/new';
import userEvent from "@testing-library/user-event";

test("ユーザー新規登録画面に「hayato」が正常に表示されている", ()=>{
  render(<UserNew/>)
  const hayato = screen.getByText("hayato");
  expect(hayato).toBeInTheDocument();
})

test("ユーザー新規登録画面に新規登録ボタンが表示されている", () => { 
  render(<UserNew/>)
  const text = screen.getByText("新規登録")
  expect(text).toBeInTheDocument()
})

test("名前入力が正常に動作する", ()=>{
  render(<UserNew/>)
  const nameInputValue = screen.getByLabelText("名前")
  userEvent.type(nameInputValue, "テストくん")
  expect(nameInputValue.value).toBe("テストくん")
})