class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.text :content
      t.string :src
      t.integer :width
      t.integer :heigth
      t.boolean :blog_post, default: false

      t.timestamps
    end
  end
end
