<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 30) as $i) {
            $username = $faker->userName;
            $email = $faker->unique()->safeEmail;
            $password = Hash::make('password');

            User::create([
                'username' => $username,
                'email' => $email,
                'password' => $password
            ]);
        }
    }
}
