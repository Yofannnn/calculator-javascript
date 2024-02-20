// calculator
let containerResult = document.querySelector('.container .container-result span');
const btn = document.querySelectorAll('.container button');

btn.forEach(x => {
    x.addEventListener('click', function () {
        let operation = this.classList.contains("operation");
        let decimal = this.classList.contains("decimal");
        let equal = this.classList.contains("equal");
        let remove = this.classList.contains("delete");
        let clear = this.classList.contains("clear");
        let number = this.classList.contains("number");

        if (clear) {
            containerResult.innerHTML = "";
        } else if (remove) {
            containerResult.innerHTML = containerResult.innerHTML.slice(0, -1);
        } else if (equal) {
            try {
                if(containerResult.innerHTML === ""){
                    this.disable = true;
                } else if(containerResult.innerHTML.endsWith(".") || containerResult.innerHTML.endsWith("+") || containerResult.innerHTML.endsWith("-") || containerResult.innerHTML.endsWith("*") || containerResult.innerHTML.endsWith("/") || containerResult.innerHTML.endsWith("%")){
                    this.disable = true;
                } else containerResult.innerHTML = eval(containerResult.innerHTML);
            } catch (error) {
                containerResult.innerHTML = "Error";
            };
        } else if (operation) {
            if(containerResult.innerHTML === ""){
                this.disable = true;
            } else if(containerResult.innerHTML.endsWith("+") || containerResult.innerHTML.endsWith("-") || containerResult.innerHTML.endsWith("*") || containerResult.innerHTML.endsWith("/") || containerResult.innerHTML.endsWith("%")){
                this.disable = true;
            } else containerResult.innerHTML += this.innerHTML;
        } else if(decimal){
            if(containerResult.innerHTML.endsWith(".")){
                this.disable = true;
            } else containerResult.innerHTML += this.innerHTML
        } else containerResult.innerHTML += this.innerHTML;
    });
});

