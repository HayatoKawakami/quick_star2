require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class UsersController < ApplicationController
      wrap_parameters :user, include: %i[name email password password_confirmation sex image birthday]
      before_action :set_user, only: %i[show edit update destroy]

      def index
        users = User.all
        render json: users
      end

      def show
        render json: @user
      end

      def create
        user = User.new(user_params)
        if user.save!
          log_in(user)
          render json: { status: :created, user: user }
        else
          render json: { status: 500 }
        end
      end

      def edit; end

      def update
        if @user.update!(user_params)
          render json: @user
        else
          render json: @user.errors
        end
      end

      def destroy
        if @user.destroy
          reset_session
          render json: @user
        else
          render json: @user.errors
        end
      end

      def take_home_pay
        user = User.find(session[:user_id])

        # 額面収入
        income = user.income
        # 健康保険料（health） ＆　厚生年金保険料(welfare)
        if income > 0 && income < 63_000
          health_welfare_insurance(2844.9, 8052.00)
        elsif income > 63_001 && income < 73_000
          health_welfare_insurance(3335.4, 8052.00)
        elsif income > 73_001 && income < 83_000
          health_welfare_insurance(3825.9, 8052.00)
        elsif income > 83_001 && income < 93_000
          health_welfare_insurance(4316.4, 8052.00)
        elsif income > 93_001 && income < 101_000
          health_welfare_insurance(4806.9, 8967.00)
        elsif income > 101_001 && income < 107_000
          health_welfare_insurance(5101.2, 9516.00)
        elsif income > 107_001 && income < 114_000
          health_welfare_insurance(5395.5, 10_065.00)
        elsif income > 114_001 && income < 122_000
          health_welfare_insurance(5787.9, 10_797.00)
        elsif income > 122_001 && income < 130_000
          health_welfare_insurance(6180.3, 11_529.00)
        elsif income > 130_001 && income < 138_000
          health_welfare_insurance(6572.7, 12_261.00)
        elsif income > 138_001 && income < 146_000
          health_welfare_insurance(6965.1, 12_993.00)
        elsif income > 146_001 && income < 155_000
          health_welfare_insurance(7357.5, 13_725.00)
        elsif income > 155_001 && income < 165_000
          health_welfare_insurance(7848.0, 14_640.00)
        elsif income > 165_001 && income < 175_000
          health_welfare_insurance(8338.5, 15_555.00)
        elsif income > 175_001 && income < 185_000
          health_welfare_insurance(8829.0, 16_470.00)
        elsif income > 185_001 && income < 195_000
          health_welfare_insurance(9319.5, 17_385.00)
        elsif income > 195_001 && income < 210_000
          health_welfare_insurance(9810.0, 18_300.00)
        elsif income > 210_001 && income < 230_000
          health_welfare_insurance(10_791.0, 20_130.00)
        elsif income > 230_001 && income < 250_000
          health_welfare_insurance(11_772.0, 21_960.00)
        elsif income > 250_001 && income < 270_000
          health_welfare_insurance(12_753.0, 23_790.00)
        elsif income > 270_001 && income < 290_000
          health_welfare_insurance(13_734.0, 25_620.00)
        elsif income > 290_001 && income < 310_000
          health_welfare_insurance(14_715.0, 27_450.00)
        elsif income > 310_001 && income < 330_000
          health_welfare_insurance(15_696.0, 29_280.00)
        elsif income > 330_001 && income < 350_000
          health_welfare_insurance(16_677.0, 31_110.00)
        elsif income > 350_001 && income < 370_000
          health_welfare_insurance(17_658.0, 32_940.00)
        elsif income > 370_001 && income < 395_000
          health_welfare_insurance(18_639.0, 34_770.00)
        elsif income > 395_001 && income < 425_000
          health_welfare_insurance(20_110.5, 37_515.00)
        elsif income > 425_001 && income < 455_000
          health_welfare_insurance(21_582.0, 40_260.00)
        elsif income > 455_001 && income < 485_000
          health_welfare_insurance(23_053.5, 43_005.00)
        elsif income > 485_001 && income < 515_000
          health_welfare_insurance(24_525.0, 45_750.00)
        elsif income > 515_001 && income < 545_000
          health_welfare_insurance(25_996.5, 48_495.00)
        elsif income > 545_001 && income < 575_000
          health_welfare_insurance(27_468.0, 51_240.00)
        elsif income > 575_001 && income < 605_000
          health_welfare_insurance(28_939.5, 53_985.00)
        elsif income > 605_001 && income < 635_000
          health_welfare_insurance(30_411.0, 56_730.00)
        elsif income > 635_001 && income < 665_000
          health_welfare_insurance(31_882.5, 59_475.00)
        elsif income > 665_001 && income < 695_000
          health_welfare_insurance(33_354.0, 59_475.00)
        elsif income > 695_001 && income < 730_000
          health_welfare_insurance(34_825.5, 59_475.00)
        elsif income > 730_001 && income < 770_000
          health_welfare_insurance(36_787.5, 59_475.00)
        elsif income > 770_001 && income < 810_000
          health_welfare_insurance(38_749.5, 59_475.00)
        elsif income > 815_001 && income < 855_000
          health_welfare_insurance(40_711.5, 59_475.00)
        elsif income > 855_001 && income < 905_000
          health_welfare_insurance(43_164.0, 59_475.00)
        elsif income > 905_001 && income < 955_000
          health_welfare_insurance(45_616.5, 59_475.00)
        elsif income > 955_001 && income < 1_005_000
          health_welfare_insurance(48_069.0, 59_475.00)
        elsif income > 1_005_001 && income < 1_055_000
          health_welfare_insurance(50_521.5, 59_475.00)
        elsif income > 1_055_001 && income < 1_115_000
          health_welfare_insurance(53_464.5, 59_475.00)
        elsif income > 1_115_001 && income < 1_175_000
          health_welfare_insurance(56_407.5, 59_475.00)
        elsif income > 1_175_001 && income < 1_235_000
          health_welfare_insurance(59_350.5, 59_475.00)
        elsif income > 1_235_001 && income < 1_295_000
          health_welfare_insurance(62_293.5, 59_475.00)
        elsif income > 1_295_001 && income < 1_355_000
          health_welfare_insurance(65_236.5, 59_475.00)
        elsif income > 1_355_001 && income < 10_000_000_000
          health_welfare_insurance(68_179.5, 59_475.00)
        end
        # 雇用保険料
        employment_insurance = income * 0.005
        # 社会保険料　
        social_insurance = @health_insurance + @welfare_pension_insurance + employment_insurance
        # 社保控除後計(Company insurance deduction poster)　cidp
        cidp = income - social_insurance
        # 源泉所得税
        income_tax =
          if cidp > 88_000 && cidp < 89_000
            130
          elsif cidp > 89_001 && cidp < 90_000
            180
          elsif cidp > 90_001 && cidp < 91_000
            230
          elsif cidp > 91_001 && cidp < 92_000
            290
          elsif cidp > 92_001 && cidp < 93_000
            340
          elsif cidp > 93_001 && cidp < 94_000
            390
          elsif cidp > 94_001 && cidp < 95_000
            440
          elsif cidp > 95_001 && cidp < 96_000
            490
          elsif cidp > 96_001 && cidp < 97_000
            540
          elsif cidp > 97_001 && cidp < 98_000
            590
          elsif cidp > 98_001 && cidp < 99_000
            640
          elsif cidp > 99_001 && cidp < 101_000
            720
          elsif cidp > 101_001 && cidp < 103_000
            830
          elsif cidp > 103_001 && cidp < 105_000
            930
          elsif cidp > 105_001 && cidp < 107_000
            1030
          elsif cidp > 107_001 && cidp < 109_000
            1130
          elsif cidp > 109_001 && cidp < 111_000
            1240
          elsif cidp > 111_001 && cidp < 113_000
            1340
          elsif cidp > 113_001 && cidp < 115_000
            1440
          elsif cidp > 115_001 && cidp < 117_000
            1540
          elsif cidp > 117_001 && cidp < 119_000
            1640
          elsif cidp > 119_001 && cidp < 121_000
            1750
          elsif cidp > 121_001 && cidp < 123_000
            1850
          elsif cidp > 123_001 && cidp < 125_000
            1950
          elsif cidp > 125_001 && cidp < 127_000
            2050
          elsif cidp > 127_001 && cidp < 129_000
            2150
          elsif cidp > 129_001 && cidp < 131_000
            2260
          elsif cidp > 131_001 && cidp < 133_000
            2360
          elsif cidp > 133_001 && cidp < 135_000
            2460
          elsif cidp > 135_001 && cidp < 137_000
            2550
          elsif cidp > 137_001 && cidp < 139_000
            2610
          elsif cidp > 139_001 && cidp < 141_000
            2680
          elsif cidp > 141_001 && cidp < 143_000
            2740
          elsif cidp > 143_001 && cidp < 145_000
            2800
          elsif cidp > 145_001 && cidp < 147_000
            2860
          elsif cidp > 147_001 && cidp < 149_000
            2920
          elsif cidp > 149_001 && cidp < 151_000
            2980
          elsif cidp > 151_001 && cidp < 153_000
            3050
          elsif cidp > 153_001 && cidp < 155_000
            3120
          elsif cidp > 155_001 && cidp < 157_000
            3200
          elsif cidp > 157_001 && cidp < 159_000
            3270
          elsif cidp > 159_001 && cidp < 161_000
            3340
          elsif cidp > 161_001 && cidp < 163_000
            3410
          elsif cidp > 163_001 && cidp < 165_000
            3480
          elsif cidp > 165_001 && cidp < 167_000
            3550
          elsif cidp > 167_001 && cidp < 169_000
            3620
          elsif cidp > 169_001 && cidp < 171_000
            3700
          elsif cidp > 171_001 && cidp < 173_000
            3770
          elsif cidp > 173_001 && cidp < 175_000
            3840
          elsif cidp > 175_001 && cidp < 177_000
            3910
          elsif cidp > 177_001 && cidp < 179_000
            3980
          elsif cidp > 179_001 && cidp < 181_000
            4050
          elsif cidp > 181_001 && cidp < 183_000
            4120
          elsif cidp > 183_001 && cidp < 185_000
            4200
          elsif cidp > 185_001 && cidp < 187_000
            4270
          elsif cidp > 187_001 && cidp < 189_000
            4340
          elsif cidp > 189_001 && cidp < 191_000
            4410
          elsif cidp > 191_001 && cidp < 193_000
            4480
          elsif cidp > 193_001 && cidp < 195_000
            4550
          elsif cidp > 195_001 && cidp < 197_000
            4630
          elsif cidp > 197_001 && cidp < 199_000
            4700
          elsif cidp > 199_001 && cidp < 201_000
            4770
          elsif cidp > 201_001 && cidp < 203_000
            4840
          elsif cidp > 203_001 && cidp < 205_000
            4910
          elsif cidp > 205_001 && cidp < 207_000
            4980
          elsif cidp > 207_001 && cidp < 209_000
            5050
          elsif cidp > 209_001 && cidp < 211_000
            5130
          elsif cidp > 211_001 && cidp < 213_000
            5200
          elsif cidp > 213_001 && cidp < 215_000
            5270
          elsif cidp > 215_001 && cidp < 217_000
            5340
          elsif cidp > 217_001 && cidp < 219_000
            5410
          elsif cidp > 219_001 && cidp < 221_000
            5480
          elsif cidp > 221_001 && cidp < 224_000
            5560
          elsif cidp > 224_001 && cidp < 227_000
            5680
          elsif cidp > 227_001 && cidp < 230_000
            5780
          elsif cidp > 230_001 && cidp < 233_000
            5890
          elsif cidp > 233_001 && cidp < 236_000
            5990
          elsif cidp > 236_001 && cidp < 239_000
            6110
          elsif cidp > 239_001 && cidp < 242_000
            6210
          elsif cidp > 242_001 && cidp < 245_000
            6320
          elsif cidp > 245_001 && cidp < 248_000
            6420
          elsif cidp > 248_001 && cidp < 251_000
            6530
          elsif cidp > 251_001 && cidp < 254_000
            6640
          elsif cidp > 254_001 && cidp < 257_000
            6750
          elsif cidp > 257_001 && cidp < 260_000
            6850
          elsif cidp > 260_001 && cidp < 263_000
            6960
          elsif cidp > 263_001 && cidp < 266_000
            7070
          elsif cidp > 266_001 && cidp < 269_000
            7180
          elsif cidp > 269_001 && cidp < 272_000
            7280
          elsif cidp > 272_001 && cidp < 275_000
            7390
          elsif cidp > 275_001 && cidp < 278_000
            7490
          elsif cidp > 278_001 && cidp < 281_000
            7610
          elsif cidp > 281_001 && cidp < 284_000
            7710
          elsif cidp > 284_001 && cidp < 287_000
            7820
          elsif cidp > 287_001 && cidp < 290_000
            7920
          elsif cidp > 290_001 && cidp < 293_000
            8040
          elsif cidp > 293_001 && cidp < 296_000
            8140
          elsif cidp > 296_001 && cidp < 299_000
            8250
          elsif cidp > 299_001 && cidp < 302_000
            8420
          elsif cidp > 302_001 && cidp < 305_000
            8670
          elsif cidp > 305_001 && cidp < 308_000
            8910
          elsif cidp > 308_001 && cidp < 311_000
            9160
          elsif cidp > 311_001 && cidp < 314_000
            9400
          elsif cidp > 314_001 && cidp < 317_000
            9650
          elsif cidp > 317_001 && cidp < 320_000
            9890
          elsif cidp > 320_001 && cidp < 323_000
            10_140
          elsif cidp > 323_001 && cidp < 326_000
            10_380
          elsif cidp > 326_001 && cidp < 329_000
            10_630
          elsif cidp > 329_001 && cidp < 332_000
            10_870
          elsif cidp > 332_001 && cidp < 335_000
            11_120
          elsif cidp > 335_001 && cidp < 338_000
            11_360
          elsif cidp > 338_001 && cidp < 341_000
            11_610
          elsif cidp > 341_001 && cidp < 344_000
            11_850
          elsif cidp > 344_001 && cidp < 347_000
            12_100
          elsif cidp > 347_001 && cidp < 350_000
            12_340
          elsif cidp > 350_001 && cidp < 353_000
            12_590
          elsif cidp > 353_001 && cidp < 356_000
            12_830
          elsif cidp > 356_001 && cidp < 359_000
            13_080
          elsif cidp > 359_001 && cidp < 362_000
            13_320
          elsif cidp > 362_001 && cidp < 365_000
            13_570
          elsif cidp > 365_001 && cidp < 368_000
            13_810
          elsif cidp > 368_001 && cidp < 371_000
            14_060
          elsif cidp > 371_001 && cidp < 374_000
            14_300
          elsif cidp > 374_001 && cidp < 377_000
            14_550
          elsif cidp > 377_001 && cidp < 380_000
            14_790
          elsif cidp > 380_001 && cidp < 383_000
            15_040
          elsif cidp > 383_001 && cidp < 386_000
            15_280
          elsif cidp > 386_001 && cidp < 389_000
            15_530
          elsif cidp > 389_001 && cidp < 392_000
            15_770
          elsif cidp > 392_001 && cidp < 395_000
            16_020
          elsif cidp > 395_001 && cidp < 398_000
            16_260
          elsif cidp > 398_001 && cidp < 401_000
            16_510
          elsif cidp > 401_001 && cidp < 404_000
            16_750
          end
        # 　take_home_pay（手取り額）　=　income　-　社会保険料-　源泉所得税　の順
        take_home_pay = income - social_insurance - income_tax
        render json: {
          income: income,
          health_insurance: @health_insurance,
          welfare_pension_insurance: @welfare_pension_insurance,
          employment_insurance: employment_insurance,
          social_insurance: social_insurance,
          income_tax: income_tax,
          take_home_pay: take_home_pay
        }
      end

      private

      def user_params
        params.permit(:id, :name, :email, :password, :password_confirmation, :sex, :birthday, :image, :income)
      end

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
