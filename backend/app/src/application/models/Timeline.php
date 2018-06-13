<?php

class Timeline extends CI_Model implements JsonSerializable {

    private $_posts = [];
    private $_userId;

    public function __construct($userId = 0) {
        parent::__construct();
        $this->_userId = $userId;
    }

    /**
     * Fetch Timeline posts from database
     */
    private function _fetchTimeline() {
        $this->load->model('post');
        $timelineData = $this->db->select('posts.*,users.name as author_name')->from('connections')
                        ->join('posts', "connections.to = posts.author_id")
                        ->join('users', "users.id = posts.author_id")
                        ->where('from', $this->_userId)->order_by('posts.created_at', 'ASC')->get();
        foreach ($timelineData->result() as $post) {
            $this->_posts[] = new Post($post);
        }
    }

    /**
     * JSON Serialize
     * @return array
     */
    public function jsonSerialize() {
        return [
            'posts' => $this->getPosts()
        ];
    }

    /**
     * Get Timeline Posts
     * @return array
     */
    public function getPosts() {
        if (count($this->_posts) == 0) {
            $this->_fetchTimeline();
        }
        return $this->_posts;
    }

}
