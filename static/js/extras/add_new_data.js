import { toaster } from "./toaster.js";

export function changePicture(
  event,
  container_name,
  $selectPhoto,
  defaultText,
  changeText
) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      toaster("Please select a Picture that is less than 2MB");
    } else {
      $(".toast").first().remove();
      const $container = $(container_name);
      if (!$container.length) return;
      const img = $("<img>")
        .attr("src", URL.createObjectURL(file))
        .addClass("h-80 w-full object-cover object-center mx-auto rounded-lg");

      $container.find("img").remove();
      $container.append(img);

      const $closeButton = $("<button>")
        .attr("id", "remove_picture")
        .addClass(
          "btn btn-destructive size-8 rounded-full absolute top-9 -left-0.5"
        )
        .html(
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>`
        )
        .on("click", function () {
          $container.find("img").remove();
          $(this).remove();
          $selectPhoto.find("span").text(defaultText);
        });

      $container.append($closeButton);
      $selectPhoto.find("span").text(changeText);
    }
  }
}

export function addNewSchoolData(school, school_picture) {
  var $addedSchool = $("#schools");

  if ($addedSchool.length === 0) {
    $("#empty_school").remove();
    $addedSchool = $("<div>", {
      id: "schools",
      class: "grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 mb-6",
    }).appendTo("#main_container");
  }

  var schoolCard = `
    <div class="h-80 sm:h-96 w-full relative rounded-lg overflow-hidden shadow-lg border border-stone-300 group">
     <h4 class="btn-destructive px-2 py-1 rounded-full absolute z-10 top-2 right-2">New</h4> 
    <div class="absolute bg-stone-200 inset-0 -z-10 ${
      !school_picture ? "animate-pulse" : ""
    }"></div>
      <div class="absolute z-10 bottom-2 left-2 group-hover:bottom-3 group-hover:left-3 group-hover:p-3 p-2 bg-stone-100/70 backdrop-blur-lg rounded-lg group-hover:bg-stone-100 group-hover:border group-hover:border-stone-300 transition-all duration-300 ease-in-out w-3/4 md:w-1/2">
        <p class="text-base text-stone-950 font-medium">${school.name}</p>
        <p class="capitalize text-stone-800">
          <span>${school.place || "unknown place"}</span>
        </p>
      </div>
      <a href="/schools/${school.id}" class="absolute inset-0 z-10"></a>`;

  if (school_picture) {
    schoolCard += `
      <img
        src="${URL.createObjectURL(school_picture)}"
        alt="School Picture"
        class="size-full object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:grayscale"
      />
    </div>`;
  } else {
    schoolCard += `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-full"
      >
        <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
        <path
          d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"
        />
        <path d="M18 5v17" />
        <path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6" />
        <path d="M6 5v17" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    </div>`;
  }
  $addedSchool.prepend(schoolCard);
}

export function addNewStudentData(student, student_picture, redirect_to) {
  var $addedStudent = $("#students");

  if ($addedStudent.length === 0) {
    $("#empty_student").remove();
    $addedStudent = $("<div>", {
      id: "students",
      class: "grid md:grid-cols-2 xl:grid-cols-3 gap-5",
    }).appendTo("#main_container");
  }

  var studentCard = `
<div class="bg-stone-100 relative hover:bg-stone-200 flex gap-4 px-4 py-3 rounded-lg group transition-colors duration-300 overflow-hidden">
  <h4 class="btn-destructive px-2 py-1 rounded-full absolute z-10 top-2 right-2">New</h4> 
  <div class="flex flex-col gap-3">
    <div class="size-32 group-hover:size-[8.5rem] transition-all duration-300 bg-stone-300 rounded-full overflow-hidden group-hover:shadow-md">      
`;

  if (student_picture) {
    studentCard += `
      <img
        src="${URL.createObjectURL(student_picture)}"
        alt="${student.name} picture"
        class="size-full object-cover object-center"
      />
    `;
  } else {
    studentCard += `
      <p class="text-8xl size-full flex items-center justify-center">
        ${student.gender === "Male" ? "👦" : "👧"}
      </p>
    `;
  }

  studentCard += `
    </div>
    <a href=${redirect_to} class="btn btn-ghost btn-size group-hover:bg-stone-100">View profile</a>
  </div>
  <div class="w-full space-y-2 lg:text-base">
    <p class="text-base md:text-lg font-medium !mb-4 w-9/12 mx-auto truncate">${student.name}</p>
    <p>${student.emis}</p>
    <p>${student.gender}</p>
    <p>${student.dob}</p>
  </div>
</div>
`;

  $addedStudent.prepend(studentCard);
}

