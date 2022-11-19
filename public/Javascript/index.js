
try{

$(".cards").slick({
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
});

}
catch(e)
{
  console.log(e);
};