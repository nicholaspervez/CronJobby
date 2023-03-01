// import { schedule } from 'node-cron';
// import axios from 'axios';

// async function baga(){
//     console.log('fired');
//     const uid = '303Ut9TLrAQjyq5hlJrmlsB66Tl2';
//     const todaysFood = await fetch(
//         `https://nicks-branch-v1million.onrender.com/todaysFood/${uid}`
//       );
//       const data = await todaysFood.json();
//       const food = data.payload;
//      axios.post(`https://app.nativenotify.com/api/indie/notification`, {
//       subID: `${uid}`,
//       appId: 6107,
//       appToken: 'RscfdJGUHSLru74JJd6STe',
//       title: 'Food due to expire today...',
//       message: `You have ${food.length} items going off today, better eat em up!`
//  });
//     }

//     schedule('* * * * * ', async() => baga(), {
//       scheduled: true,
//       timezone: "Europe/London"
//     });

const backendURL = "https://spoiler-alert-backend.onrender.com";

import { schedule } from "node-cron";
import axios from "axios";


async function forEachFunction(uid) {
  try {
    console.log("trying this");
    const todaysFood = await fetch(`${backendURL}/getTodaysFood/${uid}`);
    console.log("todays food :", todaysFood);
    //   const data = JSON.stringify(todaysFood);
    //   console.log('data : ', data)
    if (todaysFood.length > 0) {
      axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: `${uid}`,
        appId: 6107,
        appToken: "RscfdJGUHSLru74JJd6STe",
        title: "Food due to expire today...",
        message: `You have ${todaysFood.length} items going off today, better eat em up!`,
      });
    }
  } catch (exception) {
    console.log(exception);
  }
}
async function getNotification() {
  console.log("cron is fired");
  const userArray = await fetch(`${backendURL}/getAllUsers`);
  const data = await userArray.json();
  const users = data.payload;
  console.log('this is returned users from db : ',users)
  userArray.forEach((obj) => {
    console.log(obj.uid);
    forEachFunction(obj.uid);
  });
}

getNotification()

// schedule("0 9 * * * ", async () => getNotification(), {
//   scheduled: true,
//   timezone: "Europe/London",
// });
