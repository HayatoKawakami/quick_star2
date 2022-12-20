import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('新規登録ボタンが表示されている', ()=> {
  render(<App/>);
  const createUserLink = screen.getByText("新規登録");
  expect(createUserLink).toBeInTheDocument();
})

test("ログインボタンが表示されている", ()=>{
  render(<App/>);
  const loginLink = screen.getByText("ログイン");
  expect(loginLink).toBeInTheDocument();
})