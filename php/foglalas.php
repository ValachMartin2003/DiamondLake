<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query
$query = "INSERT INTO `booking`(`start`, `and`, `adult`, 
                                `kids`, `baby_bed`, `comment`, `room`, `user_id`) VALUES";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('A foglalás nem sikerült!');
}

// Set response
Util::setResponse('A foglalás sikerült!');