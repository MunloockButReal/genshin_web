        let characterLinks;

        window.onload = () => {
            if (!document.querySelector('table')){
            document.body.style.width = document.querySelector('table').offsetWidth + 'px';
            document.body.style.height = document.querySelector('table').offsetHeight + document.querySelector('div').offsetHeight + 'px';
        }}


        $.ajax({
            url: "../js/chars.json",
            dataType: 'json',
            async: false,
            success: function (data) {
                characterLinks = data;
            }
        });

        $("img").click(function () {
            window.open(characterLinks[$(this).attr("alt")]);
        });