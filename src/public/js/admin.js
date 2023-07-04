(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const tabs = Array.from(document.getElementsByClassName("tab"));
        const panes = Array.from(document.getElementsByClassName("tab-pane"));

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach(tab => tab.classList.remove("active"));
                panes.forEach(pane => pane.classList.remove("active"));
                tab.classList.add("active");
                panes[index].classList.add("active");
            });
        });

        // set first tab as being active at the start
        tabs[0].classList.add("active");
        panes[0].classList.add("active");
    });
})();
