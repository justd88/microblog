<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once __DIR__ . '/JSON_Controller.php';

class Posts extends JSON_Controller {

    const MAX_POST_LENGTH = 150;

    public function index_options() {
        $this->response(NULL, 200);
    }

    private function _extractContent($content) {
        if (is_array($content)) {
            return implode("\n", $content);
        }
        return $content;
    }

    public function index_post() {
        $content = $this->_extractContent($this->post('content'));
        if (!$content) {
            $this->response(['err' => 'content missing'], self::HTTP_BAD_REQUEST);
            return;
        }

        if (strlen($content) > self::MAX_POST_LENGTH) {
            $this->response(['err' => 'The Content is too long!(MAX ' . self::MAX_POST_LENGTH . ' characters)'], 400);
            return;
        }
        $this->load->model('post');
        $post = new Post();
        $post->setAuthorId($this->userObj->getId());
        $post->setAuthorName($this->userObj->getName());
        $post->setCreatedAt(date("Y-m-d H:i:s"));
        $post->setContent($content);
        $post->save();
        $this->response(['result' => 'OK', 'post' => $post]);
        return;
    }

    public function index_delete() {
        $id = $this->uri->segment(4) === 'id' ? $this->uri->segment(5) : NULL;
        if (!$id && is_numeric($id)) {
            $this->response(['err' => 'Id missing'], self::HTTP_BAD_REQUEST);
            return;
        }
        $this->load->model('post');
        $post = new Post();

        if ($post->load($id) && $post->getAuthorId() == $this->userObj->getId()) {

            $post->delete();
            $this->response(['result' => 'OK']);
            return;
        }

        $this->response(['err' => 'Not Allowed'], self::HTTP_METHOD_NOT_ALLOWED);
    }

}
