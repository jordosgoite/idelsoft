/*const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
});

class DB {
  static async addLead(data) {
    return knex('leads').insert(data);
  }
}*/

import knex from 'knex'; // Import knex using ES modules syntax

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});

class DB {
  static async addEmail(data) {
    return db('emails').insert(data);
  }

  static async getEmails(searchText) {
    if (searchText) {
      return db('emails')
        .where('to', 'like', `%${searchText}%`)
        .orWhere('cc', 'like', `%${searchText}%`)
        .orWhere('bcc', 'like', `%${searchText}%`)
        .orWhere('subject', 'like', `%${searchText}%`)
        .orWhere('body', 'like', `%${searchText}%`)
        .orderBy('createdAt', 'desc');
    } else {
      return db('emails').orderBy('createdAt', 'desc');
    }
  }

  static async getEmailById(id) {
    return db('emails').where('id', id).first();
  }
}

export { db, DB };