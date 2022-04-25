class AddAttributesToFullstackApp < ActiveRecord::Migration[6.1]
  def change
    add_columns :fullstack_applications,
                :k8s_service_id, :service_ip, :image_id, :container_id,
                type: :string
    add_index :fullstack_applications, :k8s_service_id, unique: true
    add_index :fullstack_applications, :service_ip, unique: true
  end
end
