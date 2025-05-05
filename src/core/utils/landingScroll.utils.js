const landingScrollLogic = () => {

  window.onscroll = () => {
    if (window.location.pathname == "/") {
      
      if (pageYOffset > 140) {
        servicesMan.style.right = "-140px";
        nav.style.opacity = 1;
      } else nav.style.opacity = 0;
      if (pageYOffset > 240) holder.style.transform = "scale(100%)";
      if (pageYOffset > 300) servicesWoman.style.left = "-110px";
      if (pageYOffset > 710) planet1.style.left = "-40px";
      if (pageYOffset > 1100) planet2.style.right = "40px";
      if (pageYOffset > 1700) coursesHolder2.style.right = "-13%";
      if (pageYOffset > 2000) coursesHolder1.style.left = "-28%";
      if (pageYOffset > 3000) {
        holderMasters.style.width = "100%";
        holderMasters.style.opacity = "1";
      }
      if (pageYOffset > 3800) {
        recommandsForm.style.height = "640px";
        recommandsForm.style.opacity = "1";
      }
      // progress Bar
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      scrollNav.style.width = scrolled + "%";
    }
    
  };

};



export default landingScrollLogic;
