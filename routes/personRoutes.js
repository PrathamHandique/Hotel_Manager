const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { run } = require("node:test");

//************************************************************************************************************ */
//Post Route to add a Person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

//*************************************************************************************************************/
//Get Route to fetch all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

//****************************************************************************************************************/
//Get Route to fetch a person by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ err: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

//***********************************************************************************************************************/
//Get Route to update a person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;//extract the id from the url
    const updatedPersonData=req.body;//updated data for the person
    const response =await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true,
    })
    if (!response){
        return res.status(404).json({error:'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

//************************************************************************************************************************/
//Get route to delete a person
router.delete("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({err:'internal server error'});
    }
})

module.exports = router;
