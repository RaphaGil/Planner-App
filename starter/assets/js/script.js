//Show the currently day
const date = dayjs().format("dddd, D MMMM YYYY");
const currentTime = dayjs().format("H");
const time = parseInt(currentTime); // Convert the current hour to an integer for comparison
console.log(time);
$("#currentDay").text(date);

//Color-code each time block based on past, present, and future
function generateSequentialTime() {
  const timeBlocks = $(".time-block");

  timeBlocks.each(function (index) {
    const hour = index + 8; // Incrementing from 8 AM onwards
    let period = "AM";

    if (hour >= 12) {
      period = "PM";
    }

    let formattedHour = hour > 12 ? hour - 12 : hour;
    const formattedTime = `${formattedHour
      .toString()
      .padStart(2, "0")} ${period}`;

    $(this).text(formattedTime);

    const textContent = $(this).next().find(".textarea");
    if (hour < time) {
      textContent.addClass("past");
    } else if (hour === time) {
      textContent.addClass("present");
    } else {
      textContent.addClass("future");
    }
  });
}

generateSequentialTime();



$(document).ready(function () {
  $(".textarea").each(function (index) {
    const savedText = localStorage.getItem(`textareaContent_${index}`);
    if (savedText) {
      $(this).val(savedText);
    }
  });

  $(".saveBtn").on("click", function (e) {
    e.preventDefault();

    const index = $(".saveBtn").index(this);
    const message = $(".textarea").eq(index).val();
    localStorage.setItem(`textareaContent_${index}`, message);

    const messageDisplay = $(".message");

    if(message){
    messageDisplay.text('Appointment added to the localstorage ✓');
    } else{
      messageDisplay.text('You havent added any information');
    }

    // Display the message for 3 seconds
    messageDisplay.fadeIn();
    setTimeout(function() {
      messageDisplay.fadeOut();
    }, 3000);
  });
});

