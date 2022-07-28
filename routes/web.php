<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use Jajo\JSONDB; // Include temporary JSON database package

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Load Initial Page
Route::get('/', function () {
    return view('welcome');
});

// Employee Creation Route. It will trigger addEmployee() method in EmployeeController
// This is the route current in action
Route::post('add', [App\Http\Controllers\EmployeeController::class, 'addEmployee'])->name('add-employee');

// Employee Creation Route. This route create employee here instead of redirecting to controller.
Route::post('/create', function(Request $request) {

    // Initiate validator
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required',
        'role' => 'required'
    ]);
    if($validator->fails()) {
        /**
         * If validation fails then return error messages with 422 status code.
         */
        return response($validator->messages(), 422);
    }

    /**
     * Initiate JSON db. The db is located in public/data folder
     */
    $db = new JSONDB(public_path('data'));

    $name = $request->input('name');
    $email = $request->input('email');
    $role = $request->input('role');

    // Check if db file exists in public/data
    if(file_exists(public_path('data/employees.json'))) {
        // Check if there is already an employee with the same email address
        $employees = $db->select('email')->from('employees.json')->where(['email' => $email])->get();
        if(count($employees) > 0) {
            // If email already exists, then return error message with 422 status code.
            return response(['email' => 'Email already exists'], 422);
        }
    }

    /**
     * Insert employee details into db file.
     * Just as mysql table, we are using employees.json for storing employee details.
     * Schema contains a unique id just like SQL table.
     */
    $db->insert('employees.json', [
        'id' => date('Ymdhis') . '' . Str::random(5),
        'name' => $name,
        'email' => $email,
        'role' => $role
    ]);

    // Once finished return success response.
    return response('Employee has been created successfully!');
});

/* React Route */
// This route is important for single page application to stay on the same page when browser reload.
Route::view('/{path?}', 'welcome')
    ->where('path', '.*')
    ->name('react');
