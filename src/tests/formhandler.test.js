const handleSubmitMock = (event, Client, fetch) => {
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
};

describe("Checking handle submit functionality", () => {
  it("function is getting called", () => {
    const event = {
      preventDefault: () => {}
    };
    const fakeFetch = url => {
      return Promise.resolve({});
    };
    const Client = {
      checkForName: () => {
        return true;
      }
    };
    document.body.innerHTML = `<div> <input id="name" value="kunal" /> <span class="show-results"></span> <span class="error"></span><button id="button" /> </div>`;
    expect(handleSubmitMock(event, Client, fakeFetch)).toBe(true);
  });
});
