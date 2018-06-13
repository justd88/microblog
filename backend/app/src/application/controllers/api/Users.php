<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once __DIR__ . '/JSON_Controller.php';

class Users extends JSON_Controller {

    public function follow_post() {
        $toFollow = $this->post('id');
        try {
            $this->userObj->follow($toFollow);
            $this->response(['status' => 'OK']);
        } catch (\Exception $e) {
            $this->response(['err' => $e->getMessage()], JSON_Controller::HTTP_BAD_REQUEST);
        }
    }

    public function follow_delete() {

        $toUnFollow = $this->delete('id');
        try {
            $this->userObj->unFollow($toUnFollow);
            $this->response(['status' => 'OK']);
        } catch (\Exception $e) {
            $this->response(['err' => $e->getMessage()], JSON_Controller::HTTP_BAD_REQUEST);
        }
    }

    public function following_get() {
       //echo date("d");
       echo date('m/d/Y H');
        $this->response(['following' => $this->userObj->getFollowing()]);
    }

    public function followers_get() {
        $this->response(['followers' => $this->userObj->getFollowers()]);
    }

    public function timeline_get() {
        $this->response(['timeline' => $this->userObj->getTimeline()]);
    }

    public function all_get() {
        $this->response(['id' => 'all']);
    }

}
