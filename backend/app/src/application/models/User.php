<?php

require_once __DIR__ . '/AbstractModel.php';

class User extends AbstractModel {

    private $_name;
    private $_timeline;
    private $_connections;
    private $_followers = [];
    private $_following = [];

    public function __construct($data = null) {
        $this->tableName = 'users';
        parent::__construct();
        if ($data) {
            $this->mapFromDatabase($data);
        }
    }

    /**
     * get user id
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * set user id
     * @param int $id
     * @return $this
     */
    public function setId(int $id) {
        $this->id = $id;
        return $this;
    }

    /**
     * set name
     * @param type $name
     * @return $this
     */
    public function setName(string $name) {
        $this->_name = $name;
        return $this;
    }

    /**
     * get name
     * @return string
     */
    public function getName(): string {
        return $this->_name;
    }

    public function follow(int $toFollow) {
        $this->load->model('connection');
        $connection = new Connection();
        $connection->setFrom($this->id);
        $connection->setTo($toFollow);
        $connection->save();
    }

    public function unFollow(int $toUnFollow) {
        $this->load->model('connection');
        $connection = new Connection();
        $connection->loadByFromTo($this->id, $toUnFollow);
        $connection->delete();
    }

    public function getFollowers() {
        if (count($this->_followers) > 0) {
            return $this->_followers;
        }
        $followersData = $this->db->select('users.*')->from('connections')
                        ->join('users', "connections.from = users.id")
                        ->where('to', $this->id)
                        ->where('from !=', $this->id)->get();

        foreach ($followersData->result() as $follower) {
            $this->_followers[] = new User($follower);
        }
        return $this->_followers;
    }

    public function getFollowing() {
        if (count($this->_following) > 0) {
            return $this->_following;
        }
        $followData = $this->db->select('users.*')->from('connections')
                        ->join('users', "connections.to = users.id")
                        ->where('from', $this->id)
                        ->where('to !=', $this->id)->get();

        foreach ($followData->result() as $follower) {
            $this->_following[] = new User($follower);
        }
        return $this->_following;
    }

    public function getConnections() {
        return $this->_connections;
    }

    protected function mapFromDatabase($data) {
        $this->id = $data->id;
        $this->_name = $data->name;
    }

    protected function mapToDatabase() {
        return [
            'name' => $this->_name
        ];
    }

    public function jsonSerialize() {
        $array = $this->mapToDatabase();
        $array['id'] = $this->id;
        return $array;
    }

    private function _fetchTimeline() {
        if (!$this->_timeline) {
            if ($this->id) {
                $this->load->model('timeline');
                $this->_timeline = new Timeline($this->id);
            } else {
                throw new \Exception("Model Not Inited");
            }
        }
    }

    public function load(int $id) {
        parent::load($id);
        $this->_fetchTimeline();
        return $this;
    }

    public function getTimeline() {

        return $this->_timeline;
    }

}
