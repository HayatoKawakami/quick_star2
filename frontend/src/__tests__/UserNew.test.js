import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { UserNew } from '../components/pages/users/new';
import userEvent from '@testing-library/user-event'



test("ユーザー新規登録画面に新規登録ボタンが表示されている", () => { 
  render(<UserNew/>)
  const text = screen.getByText("新規登録")
  expect(text).toBeInTheDocument()
})

test("名前入力が正常に動作する", ()=>{
  render(<UserNew/>)
  const nameInput = screen.getByTestId("userNewNameInput")
  fireEvent.change(nameInput, {
    target: {value: "テストくん"}
  })
  expect(nameInput.value).toBe("テストくん")
})

test("メールアドレス入力が正常に動作する", () => {
  render(<UserNew/>)
  const emailInput = screen.getByTestId("userNewEmailInput")
  fireEvent.change(emailInput, {
    target: { value: "test@gmail.com" }
  })
  expect(emailInput.value).toBe("test@gmail.com")
})

test("パスワード入力が正常に動作する", () => {
  render(<UserNew/>)
  const passwordInput = screen.getByTestId("userNewPasswordInput")
  fireEvent.change(passwordInput, {
    target: { value: "0000"}
  })
  expect(passwordInput.value).toBe("0000")
})

test("パスワード確認入力が正常に動作する", () => {
  render(<UserNew/>)
  const passwordConfirmationInput = screen.getByTestId("userNewPasswordConfirmationInput")
  fireEvent.change(passwordConfirmationInput, {
    target: { value: "0000" }
  })
  expect(passwordConfirmationInput.value).toBe("0000")
})

// test("性別入力が正常に動作する", () => {
//   render(<UserNew/>)
//   const sexInput = screen.getByLabelText("性別")
//   fireEvent.change(sexInput, {
//     target: { value: 2 }
//   })
//   expect(sexInput.value).toBe(2)
// })

test("生年月日入力が正常に動作する", () => {
  render(<UserNew/>)
  const birthdayInput = screen.getByTestId("userNewBirthdayInput")
  fireEvent.change(birthdayInput, {
    target: { value: "2022-12-15" }
  })
  expect(birthdayInput.value).toBe("2022-12-15")
})

test("額面収入入力が正常に動作する", () => {
  render(<UserNew/>)
  const incomeInput = screen.getByTestId("userNewIncomeInput")
  fireEvent.change(incomeInput, {
    target: { value: "300000" }
  })
  expect(incomeInput.value).toBe("300000")
})

test("必要情報を入力してユーザーが正常に作成される", () => {
  render(<UserNew/>)
  const nameInput = screen.getByTestId("userNewNameInput")
  const emailInput = screen.getByTestId("userNewEmailInput")
  const passwordInput = screen.getByTestId("userNewPasswordInput")
  const passwordConfirmation = screen.getByTestId("userNewPasswordConfirmationInput")
  const birthdayInput = screen.getByTestId("userNewBirthdayInput")
  const incomeInput = screen.getByTestId("userNewIncomeInput")
  const submitButton = screen.getByTestId("userNewSubmitButton")

  userEvent.type(nameInput, "河上勇人")
  userEvent.type(emailInput, "hayato.drsp@gmail.com")
  userEvent.type(passwordInput, "0000")
  userEvent.type(passwordConfirmation, "0000")
  userEvent.type(birthdayInput, "1990-03-22")
  userEvent.type(incomeInput, "300000")

  userEvent.click(submitButton);
  // ここまででテストコーディングを中断。

})