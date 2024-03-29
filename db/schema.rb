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

ActiveRecord::Schema.define(version: 20140905163456) do

  create_table "assignments", force: true do |t|
    t.string   "name"
    t.integer  "folder_id"
    t.boolean  "deleted",    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "folders", force: true do |t|
    t.string   "name"
    t.string   "subject"
    t.boolean  "deleted",    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "records", force: true do |t|
    t.date     "date"
    t.string   "who"
    t.string   "start"
    t.string   "stop"
    t.integer  "interruptions"
    t.string   "question"
    t.text     "comments"
    t.integer  "assignment_id"
    t.boolean  "commit"
    t.boolean  "deleted",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
