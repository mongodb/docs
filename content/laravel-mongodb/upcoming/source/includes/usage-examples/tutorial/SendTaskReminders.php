<?php

namespace App\Console\Commands;

use App\Models\Task; 
use Carbon\Carbon; 
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendTaskReminders extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-task-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle() {
        $now = Carbon::now();
        $upcomingTasks = Task::where('last_notification_date', null)->get();

        $upcomingTasks = Task::where('last_notification_date', null)
            ->where('reminder_time', '>=', $now->clone()->subMinutes(10))
            ->get();

        foreach ($upcomingTasks as $task) {
            $emailBody = <<<EOF
Hello,

This is a reminder for your task:

Title: {$task->title}
Description: {$task->description}
Due Date: {$task->due_date}

Please make sure to complete it on time!

Regards,
Your Task Reminder App
EOF;

            Mail::raw($emailBody, function ($message) use ($task) {
                $message->to($task->email)
                    ->subject("Task Reminder: {$task->title}");
            });

            $task->last_notification_date = $now;
            $task->save();
            $this->info("Reminder email sent for task: {$task->title}");
        }

        return self::SUCCESS;
    }
}