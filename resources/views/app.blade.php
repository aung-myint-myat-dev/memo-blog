<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <x-inertia::head />
    <script>
        (function() {
            try {
                // localStorage ထဲမှာ 'dark' ဒါမှမဟုတ် 'light' လို့ သိမ်းထားမယ်လို့ ယူဆတယ်
                const theme = localStorage.getItem('theme');
                const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                    // data-theme သုံးထားတာရှိရင်လည်း ပြဿနာမတက်အောင် ဖယ်လိုက်မယ်
                    document.documentElement.removeAttribute('data-theme');
                } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.removeAttribute('data-theme');
                }
            } catch (e) {}
        })();
    </script>
</head>

<body>
    <x-inertia::app />
</body>

</html>
