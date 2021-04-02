<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserRegister extends Mailable
{
    use Queueable, SerializesModels;

    public $link;
    public $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $link)
    {   
      $this->name = $name;
      $this->link = $link;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      return $this->view('email.user-register', [
        'name' => $this->name,
        'link' => $this->link
      ])
      ->from("no-reply@optimalstrengthgains.com", "Optimal Strength Gains")
      ->subject('Welcome to Optimal Strength Gains');
    }
}
