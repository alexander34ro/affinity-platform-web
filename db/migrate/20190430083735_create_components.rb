class CreateComponents < ActiveRecord::Migration[5.2]
  def change
    create_table :components do |t|
      t.references :user, index: true
      t.string :name, null: false, index: true
      t.string :version, null: false
      t.string :description
      t.string :ins
      t.string :out
      t.string :config_options

      t.timestamps
    end
  end
end
