# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150113053135) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "body"
    t.integer  "user_id"
    t.integer  "medium_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["created_at"], name: "index_comments_on_created_at", using: :btree
  add_index "comments", ["medium_id"], name: "index_comments_on_medium_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "media", force: :cascade do |t|
    t.string   "code",        null: false
    t.string   "title"
    t.string   "source"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "media", ["code"], name: "index_media_on_code", unique: true, using: :btree

  create_table "media_tags", force: :cascade do |t|
    t.integer "medium_id"
    t.integer "tag_id"
  end

  add_index "media_tags", ["medium_id"], name: "index_media_tags_on_medium_id", using: :btree
  add_index "media_tags", ["tag_id"], name: "index_media_tags_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "slug",        null: false
    t.string   "label"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "tags", ["slug"], name: "index_tags_on_slug", unique: true, using: :btree

  create_table "tickets", force: :cascade do |t|
    t.string   "serial_code",                   null: false
    t.integer  "user_id"
    t.integer  "medium_id"
    t.boolean  "checked_in",    default: false
    t.datetime "checked_in_at"
    t.boolean  "activated",     default: false
    t.datetime "activated_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "tickets", ["medium_id"], name: "index_tickets_on_medium_id", using: :btree
  add_index "tickets", ["user_id"], name: "index_tickets_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.boolean  "admin",             default: false
    t.string   "activation_digest"
    t.boolean  "activated",         default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "comments", "media"
  add_foreign_key "comments", "users"
  add_foreign_key "media_tags", "media"
  add_foreign_key "media_tags", "tags"
  add_foreign_key "tickets", "media"
  add_foreign_key "tickets", "users"
end
