const request = require('supertest');
const mongoose = require('mongoose');
const VM= require('../../models/vm')
let server;

describe('/api/vms/vmdata',()=>{
    
        // beforeEach(()=>{server=require('../../server')})
        // afterEach(async()=>{
        //         server.close();
        //         await VM.remove({});
        // })
        // describe('GET /',()=>{
        //     it('Check all vms', async()=>{
        //         await VM.collection.insertMany([
        //                 {InstanceId:'janith'},
        //                 {InstanceId:'kamal'}
        //         ])
        //         const res=await request(server).get('/api/vms/vmdata');
        //         // res.set('Accept', 'application/json')
        //         expect(res.status).toBe(200);
        //         expect(Content-Length).toBe(2);
        //         // expect(res.body.some(g => g.InstanceId === 'janith')).toBeTruthy();
        //         // expect(res.body.some(g => g.InstanceId === 'kamal')).toBeTruthy();
        //     })
        //  })

        beforeEach(()=>{server=require('../../server')})
        afterEach(async()=>{
                server.close();
                // await VM.remove({});
        })
        request(server)
        .get('/api/vms/vmdata')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .end(function(err, res) {
        if (err) throw err;
        });
        test('first test',()=>{

        })
})

test('first test',()=>{

})