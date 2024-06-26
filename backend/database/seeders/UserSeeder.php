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
        foreach (range(1, 100) as $i) {
            $username = $faker->userName;
            $email = $faker->unique()->safeEmail;
            $password = Hash::make('password');
            $timestamp = $faker->dateTime->format('Y-m-d H:i:s');

            User::create([
                'username' => $username,
                'email' => $email,
                'password' => $password,
                'display_picture_path' => null,
                'active' => 0,
                'logged_out' => $timestamp,
            ]);
        }
    }
}
