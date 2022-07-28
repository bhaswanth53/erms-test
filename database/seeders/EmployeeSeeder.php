<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use Jajo\JSONDB;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $db = new JSONDB(public_path('data'));
        $faker = \Faker\Factory::create();

        $roles = [
            'Author',
            'Editor',
            'Subscriber',
            'Administrator'
        ];

        for($i=0; $i<15; $i++) {
            $name = $faker->name;
            $email = $faker->email;
            $role = $roles[rand(0, count($roles)-1)];

            $is_valid = true;
            if(file_exists(public_path('data/employees.json'))) {
                $employees = $db->select('email')->from('employees.json')->where(['email' => $email])->get();
                if(count($employees) > 0) {
                    $is_valid = false;
                }
            }

            if($is_valid == true) {
                $db->insert('employees.json', [
                    'id' => date('Ymdhis') . '' . Str::random(5),
                    'name' => $name,
                    'email' => $email,
                    'role' => $role
                ]);
            }
        }
    }
}
