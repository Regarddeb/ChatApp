<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seen_by', function (Blueprint $table) {
            $table->id('seen_by_id');
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('chat_id');

            $table->foreign('member_id')->references('member_id')->on('members')->onDelete('cascade');
            $table->foreign('chat_id')->references('chat_id')->on('chats')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seen_by');
    }
};
