const backendURL = "https://spoiler-alert-backend.onrender.com";

import { schedule } from "node-cron";
import axios from "axios";


async function forEachFunction(uid) {
  try {
    const todaysFood = await fetch(`${backendURL}/getTodaysFood/${uid}`);
    if (todaysFood.length > 0) 
    {
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
  users.forEach((obj) => {
    console.log('this is user id : ',obj.uid);
    forEachFunction(obj.uid);
  });
}


schedule("0 9 * * * ", async () => getNotification(), {
  scheduled: true,
  timezone: "Europe/London",
});
