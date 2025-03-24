package diskv

type Config struct {
	Dir            string
	MaxLinkDagSize int
	Shard          ShardFun
	MaxRead        int
	MaxWrite       int
	MaxCacheDags   int
}

type Option func(cfg *Config)

func DirConf(dir string) Option {
	return func(cfg *Config) {
		cfg.Dir = dir
	}
}

func MaxLinkDagSizeConf(size int) Option {
	return func(cfg *Config) {
		cfg.MaxLinkDagSize = size
	}
}

func MaxReadConf(n int) Option {
	return func(cfg *Config) {
		cfg.MaxRead = n
	}
}

func MaxWriteConf(n int) Option {
	return func(cfg *Config) {
		cfg.MaxWrite = n
	}
}

func MaxCacheDagsConf(n int) Option {
	return func(cfg *Config) {
		cfg.MaxCacheDags = n
	}
}

func ShardFunConf(sha ShardFun) Option {
	return func(cfg *Config) {
		cfg.Shard = sha
	}
}
