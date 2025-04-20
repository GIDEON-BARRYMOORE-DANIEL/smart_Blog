

$(".post-modal").hide(); // Hide initially

$(".write-btn").on("click", function () {
    $(".post-modal").fadeIn();
});


$(".close-btn").on("click", function () {
    $(".post-modal").fadeOut();
});
$(".write-btn").on("click", () => {
    $(".post-modal").fadeIn(); 

  });

  $(".close-btn").on("click", ()=>{
    $(".post-modal").fadeOut();
  });

  $("#add-post").on("submit", (e)=>{ // get the form id and on submit process passing an input 
    e.preventDefault(); //stop the page from load
    const titleInput = $("#title").val(); //get the textinput value from the client
    const textareaInput =$("#post-story").val(); // get the textarea input from the cl
    const imageInput = $("#image")[0].files[0]; // get the image file input uploaded [0] thats the first uploaded one
    
    // getting Date code
    const currentDate = new Date().toLocaleString('en-GB', {
        hour: "2-digit",
        minute : "2-digit",
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    
    console.log(textareaInput);

    if(!titleInput || !textareaInput){
        alert("ALL INPUTS FIELDS ARE REQUIRED TO MAKE A POST");
        return;
    }

    
    

    let formData = new FormData();

    formData.append("title",titleInput );
    formData.append("storyLine",textareaInput);
    if(imageInput){
        formData.append("image", imageInput); //added the image path to the file ajax object
    }

    $.ajax({
        type: "POST",
        url : "/createPost",
        data: formData,
        processData: false, //important DO NOT LET JQUERY PROCESS THE DATA
        contentType: false, //Do NOT LET JQUERY SET CONTENT TYPE IMPORTANT 

        success : (response)=>{
            console.log(response);
            console.log(response._id);

            $(".dynamicPost-div").prepend(`
            <div class="created_post">
                <img class="createdPost_pic" src="${response.postImage ? response.postImage: "/images/default-image.jpg"}" alt ="Post Image">
                <span><b>Anonymous User</b></span>
                <span>${currentDate}</span>
                <h4><b> ${titleInput}</b></h4>
                <span>${textareaInput.substring(0,85)}...</span> <br />
                <a href="/post/${response._id}" class="read-more-link">Read article</a>
               
            </div>
            
            `)
            $("#add-post")[0].reset();
            $(".post-modal").fadeOut();
           
        },

        error : (error)=>{
            console.error("error:", error);
        }


        
    });

    

  });


  

  

  function handlePostBtnClick() {
    $(".post-modal").fadeIn();
  }
  
  // Attach click handler to standard write buttons
  $(".write-btn").on("click", handlePostBtnClick);


 
  // Mobile menu toggle
  $(".menu-toggle").on("click", function() {
    $(".navigation-div").toggleClass("active");
    // Toggle icon between bars and times
    $("#menu-icon").toggleClass("fa-bars fa-times");
  });
  
  // Function to update signup button based on screen size
  function updateSignupButton() {
    const signupBtn = $(".main-button .download-btn.signup");
    
    if($(window).width() <= 768) {
      // Change button text in mobile view
      signupBtn.html("<b>Write Post</b>");
      // Ensure it has the right class to trigger modal
      if (!signupBtn.hasClass("mobile-post-btn")) {
        signupBtn.addClass("mobile-post-btn");
        // Attach click handler if not already attached
        signupBtn.off("click").on("click", handlePostBtnClick);
      }
    } else {
      // Reset to original in desktop view
      signupBtn.html("<b>signup Now</b>");
      // Keep the write functionality since it's a "write now" button anyway
    }
  }
  
  // Run on page load
  updateSignupButton();
  
  // Run when window is resized
  $(window).on("resize", function() {
    updateSignupButton();
  });


//   let comment = {_id: "1", title: "COMMENTS", post: "sharp comment" };

//   console.log(comment.find(items => items._id));