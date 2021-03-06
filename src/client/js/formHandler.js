export const showResponse = (content, container) => {
  let ol = document.createElement("ol");
  for (let element of content) {
    const li = document.createElement("li");
    li.innerHTML = element.label;
    ol.append(li);
  }
  container.append(ol);
};

function handleSubmit(event) {
  event.preventDefault();
  let formText = document.getElementById("name").value;
  let resultsContainer = document.getElementsByClassName("show-results");
  const errorHandler = document.getElementsByClassName("error")[0];
  if (resultsContainer[0].innerHTML) {
    resultsContainer[0].innerHTML = "";
  }
  if (!Client.checkForName(formText)) {
    errorHandler.innerHTML = `Please enter chracters only`;
    return false;
  } else {
    errorHandler.innerHTML = ``;
  }
  fetch(`http://localhost:8080/text-analyze/?name=${formText}`)
    .then(res => res.json())
    .then(function(res) {
      const { categories } = res;
      showResponse(categories, resultsContainer[0]);
    })
    .catch(error => {
      resultsContainer[0].innerHTML = error;
    });
  return true;
}

export { handleSubmit };
