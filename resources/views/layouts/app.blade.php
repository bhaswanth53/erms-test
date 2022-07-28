<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>ERMS</title>

        <!-- Include stylesheet -->
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />
    </head>
    <body>
        <!-- Initiate Template -->
        @yield('content')

        <!-- Include React Script -->
        <!-- This script will be generated from src/main.js file -->
        <script src="{{ asset('js/main.js') }}"></script>
    </body>
</html>