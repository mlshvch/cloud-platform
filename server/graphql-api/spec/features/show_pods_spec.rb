require 'rails_helper'

RSpec.describe 'ShowPods', type: :feature do
  context 'with app' do
    it 'exists' do
      app = FullstackApplication.create
      expect(app.show_pods).to be_truthy
    end
  end
end
