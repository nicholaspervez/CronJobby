import { schedule } from 'node-cron';
import axios from 'axios';


async function baga(){
    console.log('fired');
    const uid = '303Ut9TLrAQjyq5hlJrmlsB66Tl2';
    const todaysFood = await fetch(
        `https://nicks-branch-v1million.onrender.com/todaysFood/${uid}`
      );
      const data = await todaysFood.json();
      const food = data.payload;
     console.log(food);
     axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${uid}`,
      appId: 6107,
      appToken: 'RscfdJGUHSLru74JJd6STe',
      title: 'Food due to expire today...',
      message: `You have ${food.length} items going off today, better eat em up!`
 });
    }

    schedule('* * * * * ', async()=>baga(), {
      scheduled: true,
      timezone: "Europe/London"
    });

