<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class JSON_Controller extends Restserver\Libraries\REST_Controller {

    protected $userObj;

    public function __construct($config = 'rest') {
        parent::__construct($config);
        $this->load->model('user');
        $this->userObj = new User();
        $this->userObj->load(1);
    }

    /**
     * Parse the DELETE request arguments / ORIGINAL FUNCTION MAILFUNCTIONING
     *
     * @access protected
     * @return void
     */
    protected function _parse_delete() {
        // These should exist if a DELETE request
        /*
         * TODO: CHECK JSON INPUT
         */
        if ($this->input->method() === 'delete') {
            foreach ($this->input->input_stream() as $key => $arg) {
                $obj = json_decode($key, TRUE);
                foreach ($obj as $inputKey => $value) {
                    $this->_delete_args[$inputKey] = $value;
                }
            }
        }
    }

}
