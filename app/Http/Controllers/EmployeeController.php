<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str; // Include string facade
use Illuminate\Support\Facades\Validator; // Include validator
use Illuminate\Support\Facades\Log; // Include Logger

use Jajo\JSONDB; // Include JSON database class

class EmployeeController extends Controller
{
    public function addEmployee(Request $request)
    {
        // Initiate validator
        Log::info('Initiating Validation');
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'role' => 'required'
        ]);

        if($validator->fails()) {
            /**
             * If validation fails then return error messages with 422 status code.
             */
            Log::error('Validaton failed');
            return response($validator->messages(), 422);
        }
        
        /**
         * Initiate JSON db. The db is located in public/data folder
         */
        Log::info('Initiating JSON database');
        $db = new JSONDB(public_path('data'));
    
        $name = $request->input('name');
        $email = $request->input('email');
        $role = $request->input('role');
    
        // Check if db file exists in public/data
        Log::info('Checking if database file existed');
        if(file_exists(public_path('data/employees.json'))) {
            // Check if there is already an employee with the same email address
            Log::info('Checking if email already existed in database');
            $employees = $db->select('email')->from('employees.json')->where(['email' => $email])->get();
            if(count($employees) > 0) {
                // If email already exists, then return error message with 422 status code.
                Log::error('Email already existed');
                return response(['email' => 'Email already exists'], 422);
            }
        }
    
        /**
         * Insert employee details into db file.
         * Just as mysql table, we are using employees.json for storing employee details.
         * Schema contains a unique id just like SQL table.
         * Id will be created using timestamp and random string length of 5.
         */
        Log::info('Inserting employee to database');
        $db->insert('employees.json', [
            'id' => date('Ymdhis') . '' . Str::random(5),
            'name' => $name,
            'email' => $email,
            'role' => $role
        ]);
    
        Log::info('Employee has been inserted to database');
        // Once finished return success response.
        return response('Employee has been created successfully!');
    }
}
