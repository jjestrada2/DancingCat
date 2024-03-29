const express = require('express');
const qrcode = require('qrcode');
const app = express();
const port = 3000; // Define the port number



// For actual application, replace with API
const mockdatabase = {}

// Add 20 random cat entries
for (let i = 1; i <= 20; i++) {
  const newEntry = generateRandomCatEntry();
  mockdatabase[1 + Object.keys(mockdatabase).length] = newEntry;
}


app.get('/search', (req,res)=>{
  const searchterm = req.query.searchterm
  const results = []
  const MAX_RESULT_COUNT = 10
  let result_count = 0

  if(!searchterm)searchterm=''

  for(let id of Object.keys(mockdatabase)){
    const cat = mockdatabase[id];
    if (
      cat.name.toLowerCase().includes(searchterm.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchterm.toLowerCase()) ||
      cat.color.toLowerCase().includes(searchterm.toLowerCase()) ||
      id == parseInt(searchterm)
    ) {
      result_count +=1
      results.push(cat);
    }

    if(MAX_RESULT_COUNT == result_count){
      break
    }
  }

  res.json(results);
})

app.get('/getcat', (req,res)=>{
  let catid = req.query.catid

  res.json(mockdatabase[catid])
})

app.get('/qrcode',async (req,res)=>{
  const catid = req.query.catid
      try{
        const qrcode = await generateQRCode(catid)
        const buffer = Buffer.from(qrcode.replace(/^data:image\/png;base64,/, ''), 'base64');

        res.contentType('image/png')
        res.send(buffer)
      }
      catch (err){
        console.error(err);
        res.status(500).send('Error generating QR code');
      }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





function generateQRCode(id) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(id, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

function generateRandomCatEntry() {
  const names = ["Luna", "Mittens", "Whiskers", "Willow", "Simba", "Garfield", "Oliver", "Smokey", "Tigger", "Patches"];
  const breeds = ["Maine Coon", "Persian", "Siamese", "Ragdoll", "Sphynx", "British Shorthair", "Scottish Fold", "Abyssinian", "Burmese", "Bengal"];
  const colors = ["black", "white", "brown", "gray", "orange", "tabby", "calico", "tortoiseshell", "bi-color", "tri-color"];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomBirthday = `${Math.floor(Math.random() * 30) + 1}-${Math.floor(Math.random() * 12) + 1}-${2023 - Math.floor(Math.random() * 3)}`;

  return {
    name: randomName,
    breed: randomBreed,
    color: randomColor,
    birthday: randomBirthday,
  };
}