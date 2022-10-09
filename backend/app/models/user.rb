class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6, maximum: 32 }
  validates :password_confirmation, presence: true, length: { minimum: 6, maximum: 32 }
  validates :sex, presence: true
  validates :birthday, presence: true
end
