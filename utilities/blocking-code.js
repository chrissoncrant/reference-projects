export default function blockCodeForTimePeriodInMs(time) {
    //Store current time to compare against
    let now = Date.now();

    // console.log(now);

    //Compares the difference between current time and the stored time against the time we want it to run for. 
    while((Date.now() - now) < time) {

    }

    now = Date.now();

    // console.log('done!', now)
}