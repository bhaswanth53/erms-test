<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use Jajo\JSONDB;

class EmployeeController extends Controller
{
    public function addEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'role' => 'required'
        ]);

        if($validator->fails()) {
            return response($validator->messages(), 422);
        }
    
        $db = new JSONDB(public_path('data'));
    
        $name = $request->input('name');
        $email = $request->input('email');
        $role = $request->input('role');
    
        if(file_exists(public_path('data/employees.json'))) {
            $employees = $db->select('email')->from('employees.json')->where(['email' => $email])->get();
            if(count($employees) > 0) {
                return response(['email' => 'Email already exists'], 422);
            }
        }
    
        $db->insert('employees.json', [
            'id' => date('Ymdhis') . '' . Str::random(5),
            'name' => $name,
            'email' => $email,
            'role' => $role
        ]);
    
        return response('Employee has been created successfully!');
    }
}
