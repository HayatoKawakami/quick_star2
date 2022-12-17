import { render, screen } from '@testing-library/react';
import { UserNew } from '../components/pages/users/new';

test("ユーザー新規登録画面に「hayato」が正常に表示されている", ()=>{
  render(<UserNew/>)
  const hayato = screen.getByText("hayato");
  expect(hayato).toBeInTheDocument();
})
