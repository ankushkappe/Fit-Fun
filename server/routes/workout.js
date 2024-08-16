const OpenAI = require("openai");
const express = require('express');
const router = express.Router();
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

router.post('/generate-workout', async (req, res) => {
    const { conversation } = req.body;
    const prompt = `
    You are an expert fitness coach. 
    Create a customized weekly workout plan for a ${conversation.gender} of weight ${conversation.weight}
    of height ${conversation.height_feet} feet ${conversation.height_inches} inches,
    calculate my Body Mass Index (BMI)
    who aims to ${conversation.goals} and work on ${conversation.muscleGroup}. 
    I’m available to workout 7 days per week and 
    have access to ${conversation.equipment}. Make all of these into consideration
    to generate a weekly workout plan.
    (or) 
    If you want you can ask me the following questions one by one:
    1. What is your Gender?
    2. What is your height in Feet" Inches'?
    3. What is your weight in kg's?
    4. What are your fitness goal's (Bulk, cut, healthy, Improve energy, etc)?
    5. Which muscle groups do you want to focus on?
    6. What equipment do you have available?

    User's responses:
    ${conversation.join('\n')}
    
    If all information is gathered, provide a workout plan based on the details.
    `;

    try {
        const { data } = await openai.chat.completions.create({
            model: 'gpt-4.o mini',
            messages: [{ role: 'system', content: prompt }],
            max_tokens: 200,
            temperature: 0.7
        });
        if(data){
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
              }
        }
    } catch (error) {
        console.log(error)
        console.error('Error generating workout plan:', error.message, error.response ? error.response.data : null);
        res.status(500).json({ error: 'Failed to generate workout plan' });
    }
});

module.exports = router;