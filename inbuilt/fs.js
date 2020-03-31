var fs= require('fs');

// fs.writeFile('test1.txt','THis is from Node fs',function(err){
//     if(err) throw err
//     console.log('File created')
// });
fs.access("text1.txt",function(err){
    console.log(err);
    if(!err) 
    {
        fs.readFile('test1.txt','utf-8',function(err,data){
            if(err) throw err
            if(data.includes('THis is from Node fs',0))
            {
            console.log('Data exists');
            }
            else
            {
                fs.appendFile('test1.txt','Appended Text \n',function(err){
                        if(err) throw err
                        console.log('Text appended')
                        console.log(data)
                    });
            }
        });
    }
    else
    {
        fs.writeFile('test1.txt','THis is from Node fs',function(err){
            if(err) throw err
            console.log('File created')
        });
    }
})


// fs.appendFile('test1.txt','THis is from Node fs \n',function(err){
//     if(err) throw err
//     console.log('File created')
// });
// fs.readFile('test1.txt','utf-8',function(err,data){
//     if(err) throw err
//     console.log(data);
// })
// fs.unlink('test1.txt',function(err){
//     if(err) throw err
//     console.log('File Deleted');
// })

// fs.rename('db.json','db1.json',function(err){
//     if(err){
//         console.log('Error No File Exist')
//     }else{
//         console.log('File Rename');
//     }
    
// })