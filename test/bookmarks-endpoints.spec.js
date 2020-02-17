const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeTestBookmarks } = require('./bookmarks.fixtures')
const store = require('../src/store')

describe('Bookmarks Endpoints', function() {
    let db

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('clean the table', () => db('bookmarks').truncate())

    afterEach('cleanup', () => db('bookmarks').truncate())

       context('Given there are bookmarks in the database', () => {
             const testBookmarks = makeTestBookmarks();
        
            beforeEach('insert bookmarks', () => {
               return db
                 .into('bookmarks')
                 .insert(testBookmarks)
            })
            it('GET /bookmarks responds with 200 and all of the articles', () => {
                return supertest(app)
                    .get('/bookmarks')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                      
                })
            it('GET /bookmarks/:id responds with 200', () => {
                    const bookmarksID = 2
                    const expectedBookmark = testBookmarks[bookmarksID - 1]
                    return supertest(app)
                      .get(`/bookmarks/${bookmarksID}`)
                      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                      .expect(200)
              })
            it('POST /bookmarks adds a new bookmark to the store', () => {
                const newBookMark = {
                    title: 'test',
                    url: 'kajfksaj',
                    rating: '3',
                    description: 'blahad kajfkasjfskaf sk sjf'
                }
                return supertest(app)
                .post('/bookmarks')
                .send(newBookMark)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newBookMark.title)
                    expect(res.body.url).to.eql(newBookMark.url)
                    expect(res.body.rating).to.eql(newBookMark.rating)
                    expect(res.body.description).to.eql(newBookMark.description)
                })
                .then(res => {
                    expect(store.bookmarks[store.bookmarks.length -1]).to.eql(res.body)
                })

            })
            it('DELETE /bookmarks/:id removes the specified bookmark from the store', () => {
                const secondBookmark = store.bookmarks[1]
                const expectedBookmarks = store.bookmarks.filter(s => s.id !== secondBookmark.id)
                return supertest(app)
                .delete(`/bookmarks/${secondBookmark.id}`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(204)
                .then(() => {
                    expect(store.bookmarks).to.eql(expectedBookmarks)
                })
            })
        })
})
